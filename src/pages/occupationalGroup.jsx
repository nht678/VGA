import React from "react";
import { Helmet } from "react-helmet-async";
import OccupationalGroupView from "src/sections/occupationalGroup/view/occupationalGroup-view";

export default function OccupationalGroupPage() {
    return (
        <>
            <Helmet>
                <title>Nhóm ngành</title>
            </Helmet>

            <OccupationalGroupView />
        </>
    );
}
