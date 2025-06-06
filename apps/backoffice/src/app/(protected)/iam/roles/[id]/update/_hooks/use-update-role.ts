import { roleUpdateSchema } from "@/shared/apis/roles/schema";
import { TRoleUpdateRequest } from "@/shared/apis/roles/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { ROUTES } from "@/shared/commons/constants/routes";
import { useGetDetailRole } from "@/shared/hooks/roles/use-get-detail-role";
import { usePutUpdateRole } from "@/shared/hooks/roles/use-put-update-role";

export const useUpdateRole = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate, isPending } = usePutUpdateRole();
  const { data, isLoading } = useGetDetailRole(params.id ?? "");

  const form = useForm<TRoleUpdateRequest>({
    mode: "all",
    resolver: zodResolver(roleUpdateSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        id: data.data.id,
        name: data.data.name,
        permissions: data.data.permissions.map((permission) => permission.id),
      });
    }
  }, [data?.data, form]);

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Role updated successfully");
        navigate(ROUTES.iam.roles.list);
      },
      onError: (err) => void message.error(err?.response?.data?.message),
    });
  });

  const state = {
    isLoading: isLoading || isPending,
  };

  const handler = {
    onSubmit,
  };

  return {
    form,
    state,
    handler,
  };
};
