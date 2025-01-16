import React from "react";

const HeaderComponent = ({title, subtitle}) => {
    return (
        <div className="flex flex-col justify-start w-full h-max">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-thin">{subtitle}</p>
        </div>
    )
}

export default HeaderComponent;