import React from "react";

const CharacterPreviewCard = ({
    level,
    classes,
    fullName,
    race,
    photo
}) => {
    const classesBlocks = classes.map(
        characterClass => (
                <div>
                    <span>{characterClass.type}</span>
                    <span> Level: {characterClass.level}</span>
                </div>
            )
        );
    return (
        <div>
            <div>{fullName}</div>
            <div>Уровень: {level}</div>
            <div>{classesBlocks}</div>
            <div>{race}</div>
            <img width={100} height={100} src={photo} alt="Фотография персонажа" />
        </div>
    );
};

export default CharacterPreviewCard;