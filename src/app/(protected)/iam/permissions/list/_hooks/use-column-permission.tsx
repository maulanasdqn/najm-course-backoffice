import { TPermissionItem, TPermissionListResponse } from "@/api/permissions/type";
import dayjs from "dayjs";
import { Space, Button, Modal, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router";
import { useDeletePermission } from "./use-delete-permission";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TResponseError } from "@/commons/types/response";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/commons/constants/permissions";
import { ROUTES } from "@/commons/constants/routes";

type TUseColumnPermissionProps = {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TPermissionListResponse, TResponseError>>;
};

export const useColumnPermission = (props: TUseColumnPermissionProps) => {
  const { mutate } = useDeletePermission();

  const handleDelete = (record: TPermissionItem) => {
    Modal.confirm({
      title: "Are you sure you want to delete this permission?",
      content: record.name,
      okText: "Yes",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        mutate(record.id, {
          onSuccess: () => {
            void props.refetch?.();
            message.success("Permission deleted successfully");
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Permission Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => <span>{dayjs(created_at).format("DD/MM/YYYY HH:mm")}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: string) => <span>{dayjs(updated_at).format("DD/MM/YYYY HH:mm")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: TPermissionItem) => (
        <Space>
          <Guard fallback="-" permissions={[PERMISSIONS.PERMISSIONS.READ_DETAIL_PERMISSIONS]}>
            <Link to={generatePath(ROUTES.iam.permissions.detail, { id: record.id })}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.PERMISSIONS.UPDATE_PERMISSIONS]}>
            <Link to={generatePath(ROUTES.iam.permissions.update, { id: record.id })}>
              <Button type="text" icon={<EditOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.PERMISSIONS.DELETE_PERMISSIONS]}>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Guard>
        </Space>
      ),
    },
  ];

  return {
    columns,
  };
};
