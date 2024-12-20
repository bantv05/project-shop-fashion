import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RoleSelection = ({ roles }) => {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        if (role === 'ADMIN') {
            navigate('/');
        }
    }

    return (
        <div>
            <h1>Chọn vai trò của bạn</h1>
            {roles.length === 0 ? (
                <p>Không có vai trò nào để chọn.</p>
            ) : (
                <div>
                    {roles.map((role, index) => (
                        <button key={index} onClick={() => handleRoleSelection(role)}>
                            {role}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

