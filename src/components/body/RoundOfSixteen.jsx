import styles from './RoundOfSixteen.module.css';
import React from 'react';

export function RoundOfSixteen(props) {
    return (
        <div className={styles.finalSixteen}>
            <h5>
                <p>GRUPO</p>
                <p>{props.group}</p>
                {props?.teams?.map((player, index) => {
                    return <p key={index}>{player.Name}</p>
                })}

            </h5>
        </div>

    )
}

