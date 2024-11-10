import React from "react";
import { Helmet } from "react-helmet-async";
import WorkSkillView from "src/sections/workSkill/view/workSkill-view";

export default function WorkSkillPage() {
    return (
        <>
            <Helmet>
                <title>Kỹ năng nghề nghiệp</title>
            </Helmet>

            <WorkSkillView />
        </>
    );
}

