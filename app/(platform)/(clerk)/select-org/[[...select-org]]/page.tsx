import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationListPage() {
  return <OrganizationList
   hidePersonal
   afterCreateOrganizationUrl="/organization/:id"
   afterSelectOrganizationUrl="/organization/:id"
  />;
}
