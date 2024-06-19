import { useEffect, useState } from "react";
import styles from "./NaverBook.module.css"; // CSS 모듈 임포트

const NaverBook = () => {
    const [query, setQuery] = useState("2024");
    const [books, setBooks] = useState([]);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                `/api/v1/search/book.json?query=${query}&display=50`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'X-Naver-Client-Id': `${import.meta.env.VITE_NAVER_CLIENT_ID}`,
                    'X-Naver-Client-Secret': `${import.meta.env.VITE_NAVER_CLIENT_SECRET}`,
                }
            });
            const response = await data.json();
            setBooks(response.items);
        };

        fetchData();
    }, [query]);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            setQuery(event.target.value);
        }
    };

    const openModal = (item) => {
        setModalContent(item);
        document.getElementById("myModal").style.display = "block";
    };

    const closeModal = () => {
        setModalContent(null);
        document.getElementById("myModal").style.display = "none";
    };

    return (
        <div className={styles.bookContainer}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="검색어를 입력하고 엔터를 누르세요"
                    onKeyDown={handleSearch}
                    className={styles.searchInput}
                />
            </div>
            <h1>&ldquo;{query}&rdquo; 책 소개</h1>
            {books.map((item, index) => {
                return (
                    <div className={styles.bookItem} key={index}>
                        <img src={item.image} alt={item.title} className={styles.bookImage} onClick={() => openModal(item)} />
                        <div className={styles.bookDetails}>
                            <a href={item.link}><h2>{item.title}</h2></a>
                            <p><strong>저자:</strong> {item.author}</p>
                            <p><strong>가격:</strong> {item.discount}원</p>
                        </div>
                    </div>
                )
            })}

            {modalContent && (
                <div id="myModal" className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                        <div className={styles.modalBody}>
                            <img src={modalContent.image} alt={modalContent.title} className={styles.modalImage} />
                            <div className={styles.modalDescription}>
                                <h2>{modalContent.title}</h2>
                                <p><strong>설명:</strong> {modalContent.description}</p>
                                <p><strong>저자:</strong> {modalContent.author}</p>
                                <p><strong>가격:</strong> {modalContent.discount}원</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NaverBook;
