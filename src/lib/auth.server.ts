import { cookies } from "next/headers";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getUserWithPermissions(): Promise<{
  user: User | null;
  roles: string[];
  permissions: string[];
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data.user;

  if (error) {
    throw new Error('Failed to fetch user');
  }

  if (!user) {
    redirect('/login?error=unauthorized');
  }

  // Get roles for the user
  const { data: rolesData, error: rolesError } = await supabase
    .from('utilisateur_roles')
    .select('role')
    .eq('utilisateur_uid', user.id);

  if (rolesError) {
    throw new Error('Failed to fetch user roles');
  }

  const roles = rolesData?.map((r: { role: string }) => r.role) ?? [];

  // Get permissions for the roles
  let permissions: string[] = [];
  if (roles.length > 0) {
    const { data: permissionsData, error: permissionsError } = await supabase
      .from('role_permissions')
      .select('permission')
      .in('role', roles);

    if (permissionsError) {
      throw new Error('Failed to fetch user permissions');
    }

    permissions = permissionsData?.map((p: { permission: string }) => p.permission) ?? [];
  }

  return { user, roles, permissions };
}
