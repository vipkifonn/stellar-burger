import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div className={styles.modal} data-cy='modal'>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
          <button
            className={styles.button}
            data-cy='close-modal'
            type='button'
            onClick={onClose}
          >
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
