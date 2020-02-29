import React from "react";
import styles from './CharacterPreviewCard.module.css';

const CharacterPreviewCard = ({
                                  level,
                                  classes,
                                  fullName,
                                  race,
                                  photo
                              }) => {
    const classesBlocks = classes.map(
        (characterClass, i) => (
            <p key={i}>
                <span>{characterClass.type.replace(/^./, match => match.toString().toUpperCase())}</span>
                <span> Level: {characterClass.level}</span>
            </p>
        )
    );
    return (
        <div className={styles.CharacterPreviewCard}>
            <img src={photo} alt="Фотография персонажа"/>
            <div>
                <h4>{fullName}</h4>
                <p>Уровень: {level}</p>
                <div>{classesBlocks}</div>
                <p>{race}</p>
            </div>
        </div>
    );
};

export default CharacterPreviewCard;
