"use client";

import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, message } from "antd";
import { useUserQuery } from "../_hooks/use-user-query";
import { Link, useNavigate, useParams } from "react-router";
import { ROUTES } from "@/commons/constants/routes";
import { urlParser } from "@/utils/url-parser";
import { useDeleteUserMutation } from "../../list/_hooks/use-delete-user-mutation";

export const Component = () => {
  const params = useParams();
  const userId = typeof params.id === "string" ? params.id : "";
  const userQuery = useUserQuery(userId);
  const navigate = useNavigate();
  const deleteUserMutation = useDeleteUserMutation();

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: ROUTES.dashboard,
    },
    {
      label: "User",
      path: ROUTES.iam.users.list,
    },
    {
      label: userQuery.data?.data.name ?? "",
      path: `/iam/users/${userQuery.data?.data.id}`,
    },
  ];

  return (
    <Page
      topActions={
        <Flex gap={10}>
          <Button
            htmlType="button"
            onClick={() => {
              deleteUserMutation.mutate(userQuery.data?.data.id ?? "", {
                onSuccess: () => {
                  message.success("User berhasil dihapus");
                  navigate(ROUTES.iam.users.list);
                },
              });
            }}
          >
            Delete
          </Button>
          <Link
            to={urlParser(ROUTES.iam.users.update, {
              id: Number(userQuery.data?.data.id),
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title="Detail User"
      breadcrumbs={breadcrumbs}
      noStyle
    >
      <Section loading={userQuery.isLoading} title="Detail User">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {userQuery.data?.data.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Email">
            {userQuery.data?.data.email}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Role">
            {userQuery.data?.data.roles.map((role) => role.name).join(", ")}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default Component;
