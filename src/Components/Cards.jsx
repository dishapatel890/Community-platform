import React from 'react';
import styles from '../Styles/Cards.module.css';

const Cards = ({ title, members, Icon, desc }) => {
    return (
        <>
            <div className={styles.vertical_column}>
                <div className={styles.single_com}>
                    <img src={Icon} alt="icon" />
                    <h3>{title}</h3>
                    <hr />
                    <p>{desc}</p>
                    <p>members{members}</p>
                    <button type='button' className={styles.join_btn}>Join</button>
                </div>
            </div>
        </>
    )
}

export default Cards