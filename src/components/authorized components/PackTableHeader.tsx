import React from 'react';
import s from './PackTableHeader.module.css';

export const PackTableHeader = () => {
    return (
        <thead className={s.tableHead}>
        <tr className={s.headerCell}>
            <th className={s.cell}>Name</th>
            <th className={s.cell}>Cards</th>
            <th className={s.cell}>Last Updated</th>
            <th className={s.cell}>Created by</th>
            <th className={s.cell}>Actions</th>
        </tr>
        </thead>
    )
}