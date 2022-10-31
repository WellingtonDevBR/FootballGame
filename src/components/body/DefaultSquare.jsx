import styles from './DefaultSquare.module.css'

export function DefaultSquare(props) {
    return (
        <div className={styles.defaultSquare}>
            <h4>
                {props.teams.map((team, index) => {
                    return <p key={index}>{team.Group + ". " + team.Name}</p>
                })}
            </h4>
        </div>

    )
}