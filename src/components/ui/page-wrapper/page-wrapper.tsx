import React, { FC } from 'react';
import { PageWrapperProps } from './type';
import styles from './page-wrapper.module.css';

export const PageWrapper: FC<PageWrapperProps> = ({ children, title }) => (
  <div className={styles.container}>
    <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
    {children}
  </div>
);
