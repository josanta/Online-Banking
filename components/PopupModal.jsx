import { useState, useEffect } from 'react';
import styles from '@/PopupModal.module.css';
import Image from "next/image";
// import { loading } from '/public/loading.gif'
const PopupModal = ({ message }) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 10000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showModal && (
        <div className={`${styles.modal} bg-white min-w-96 md:min-w-96`}>
          <div className={styles.modalContent}>
            <p>{message}</p>
            <Image className='m-auto mt-5' src="/loading.gif" width={200} height={20} />
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModal;
