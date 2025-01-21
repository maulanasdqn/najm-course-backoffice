import { Page } from "admiral";
import { ROUTES } from "@/commons/constants/routes";
import { Col, Row, message } from "antd";
import { usePutUpdateRole } from "./_hooks/use-update-role-mutation";
import { useGetDetailRole } from "../_hooks/use-get-detail-role";
import { TRoleUpdateRequest } from "@/api/role/type";
import { useNavigate, useParams } from "react-router-dom";
import { FormRole } from "../_components/form-role";

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();

  const roleId = typeof params.id === "string" ? params.id : "";

  const roleQuery = useGetDetailRole(roleId);

  const updateRoleMutation = usePutUpdateRole(roleId);

  const handleOnFinish = (data: TRoleUpdateRequest) =>
    updateRoleMutation.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.iam.roles.list);
        message.success("Role berhasil diupdate");
      },
      onError: () => {
        message.error("Role gagal diupdate");
      },
    });

  const breadcrumb = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/roles",
    },
    {
      label: roleQuery.data?.data.name ?? "",
      path: `/roles/${roleQuery.data?.data.id}`,
    },
    {
      label: "Update",
      path: "#",
    },
  ];

  const initialValues = {
    name: roleQuery.data?.data.name,
    roleKey: roleQuery.data?.data.key,
    permissions_ids: roleQuery.data?.data.permissions?.map((role) => ({
      label: role.name,
      value: role.id,
    })),
  };

  return (
    <Page title="Update Role" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormRole
            key={roleQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues,
              disabled: roleQuery.isLoading,
            }}
            error={updateRoleMutation.error}
            loading={roleQuery.isLoading || updateRoleMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};
