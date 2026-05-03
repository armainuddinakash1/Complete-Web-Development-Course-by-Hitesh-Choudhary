import React from "react";

function UserProfile({ params }: any) {
   const { id } = React.use(params) as { id: string };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl mb-4">User {id}</h1>
        </div>
    );
}

export default UserProfile;
