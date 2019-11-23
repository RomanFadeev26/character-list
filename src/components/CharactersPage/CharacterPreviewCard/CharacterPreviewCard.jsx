import React from "react";

const CharacterPreviewCard = ({
    level,
    classes,
    fullName,
    race,
    photo,
    id
}) => {
const classesBlocks = classes.map(characterClass => (<div>{characterClass}</div>))
    return (
        <div>
            <div>{fullName}</div>
            <div>Уровень: {level}</div>
            <div>{classesBlocks}</div>
        </div>
    );
};
