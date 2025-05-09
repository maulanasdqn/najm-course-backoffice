export const ROUTES = {
  dashboard: "/dashboard",
  auth: {
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  iam: {
    users: {
      list: "/iam/users/list",
      create: "/iam/users/create",
      detail: "/iam/users/:id/detail",
      update: "/iam/users/:id/update",
      delete: "/iam/users/:id/delete",
    },
    roles: {
      list: "/iam/roles/list",
      create: "/iam/roles/create",
      detail: "/iam/roles/:id/detail",
      update: "/iam/roles/:id/update",
      delete: "/iam/roles/:id/delete",
    },
    permissions: {
      list: "/iam/permissions/list",
      create: "/iam/permissions/create",
      detail: "/iam/permissions/:id/detail",
      update: "/iam/permissions/:id/update",
      delete: "/iam/permissions/:id/delete",
    },
  },
  exams: {
    sessions: {
      list: "/exams/sessions/list",
      create: "/exams/sessions/create",
      detail: "/exams/sessions/:id/detail",
      update: "/exams/sessions/:id/update",
    },
    tests: {
      list: "/exams/tests/list",
      create: "/exams/tests/create",
      detail: "/exams/tests/:id/detail",
      update: "/exams/tests/:id/update",
      delete: "/exams/tests/:id/delete",
    },
    accurations: {
      list: "/exams/accurations/list",
      create: "/exams/accurations/create",
      detail: "/exams/accurations/:id/detail",
      update: "/exams/accurations/:id/update",
      delete: "/exams/accurations/:id/delete",
    },
    results: {
      list: "/exams/results/list",
      create: "/exams/results/create",
      detail: "/exams/results/:id/detail",
      update: "/exams/results/:id/update",
      delete: "/exams/results/:id/delete",
    },
  },
};
