import { Fragment } from "react"
import OrganizationControl from "./_components/org-control"
import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata() {
    const { orgSlug } = auth();
    return {
        title: startCase(orgSlug || "organization"),
        //description: `Manage ${startCase(orgI)} organization`,
    }
}

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <Fragment>
            <OrganizationControl/>
            {children}
        </Fragment>
    )
}
export default OrganizationLayout