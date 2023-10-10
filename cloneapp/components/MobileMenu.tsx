// will be used to display items for smaller screen 

import React from "react";

interface MobileMenuProps {
    visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
    
    return (
        <div
            className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 ${
                visible ? "flex" : "hidden"
            }`}
        >
            <div className="flex flex-col gap-4 ">
                <div className="text-white hover:underline px-3">Movies</div>
                <div className="text-white hover:underline px-3">Series</div>
                <div className="text-white hover:underline px-3">New and Popular</div>
                <div className="text-white hover:underline px-3">My List</div>
                <div className="text-white hover:underline px-3">Browse by Language</div>
            </div>
        </div>
    );
};

export default MobileMenu;