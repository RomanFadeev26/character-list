import React from "react";
import {Link} from 'react-router-dom';
import styles from './CharacterPreviewCard.module.css';

const CharacterPreviewCard = ({
    id, level, classes, fullName, race, photo
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
        <Link to={`/characters/${id}`}>
            <div className={styles.CharacterPreviewCard}>
                <img src={photo} alt="Фотография персонажа"/>
                <div>
                    <h4>{fullName}</h4>
                    <p>Уровень: {level}</p>
                    <div>{classesBlocks}</div>
                    <p>{race}</p>
                </div>
            </div>
        </Link>
    );
};

export default CharacterPreviewCard;
