import { useEffect, useState } from "react";
import styles from "./NaverBook.module.css"; // CSS 모듈 임포트

const NaverSearchTrend = () => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const [startDate, setStartDate] = useState(sixMonthsAgo.toISOString().split("T")[0]);   // yyyy-mm-dd
    const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);   // yyyy-mm-dd
    const [timeUnit, setTimeUnit] = useState("month"); // date, week, month
    const [keywordGroups, setKeywordGroups] = useState([{ groupName: "저녁약속뭐먹지", keywords: ["한글", "korean"] }, { groupName: "영어", keywords: ["영어", "english"] }]);
    const [device, setDevice] = useState("mo"); // "", pc, mo
    const [gender, setGender] = useState("");
    const [age, setAge] = useState([]);

    const [results, setResults] = useState([]);
    const [modalContent, setModalContent] = useState(null);

    const fetchData = async () => {
        const body = {
            startDate,
            endDate,
            timeUnit,
            keywordGroups,
            device,
            gender
        };

        if (age.length > 0) {
            body.ages = age;
        }

        const data = await fetch(
            '/api/v1/datalab/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Naver-Client-Id': `${import.meta.env.VITE_NAVER_API_CLIENT_ID}`,
                'X-Naver-Client-Secret': `${import.meta.env.VITE_NAVER_API_CLIENT_SECRET}`,
            },
            body: JSON.stringify(body)
        });
        const response = await data.json();
        setResults(response.results);
    };

    const handleSearch = () => {
        fetchData();
    };

    const handleKeywordChange = (index, value) => {
        const newKeywordGroups = [...keywordGroups];
        newKeywordGroups[index].groupName = value;
        setKeywordGroups(newKeywordGroups);
    };

    const handleKeywordGroupChange = (index, keywordIndex, value) => {
        const newKeywordGroups = [...keywordGroups];
        newKeywordGroups[index].keywords[keywordIndex] = value;
        setKeywordGroups(newKeywordGroups);
    };

    const addKeywordGroup = () => {
        setKeywordGroups([...keywordGroups, { groupName: "", keywords: [""] }]);
    };

    const addKeywordToGroup = (index) => {
        const newKeywordGroups = [...keywordGroups];
        newKeywordGroups[index].keywords.push("");
        setKeywordGroups(newKeywordGroups);
    };

    return (
        <div className={styles.bookContainer}>
            <div className={styles.searchContainer}>
                <div>
                    <label>시작 일자:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>종료 일자:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>기간 단위:</label>
                    <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
                        <option value="date">날짜</option>
                        <option value="week">주</option>
                        <option value="month">월</option>
                    </select>
                </div>
                <div>
                    <label>디바이스:</label>
                    <select value={device} onChange={(e) => setDevice(e.target.value)}>
                        <option value="">모두</option>
                        <option value="pc">PC</option>
                        <option value="mo">모바일</option>
                    </select>
                </div>
                <div>
                    <label>성별:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">모두</option>
                        <option value="m">남성</option>
                        <option value="f">여성</option>
                    </select>
                </div>
                <div>
                    <label>연령대:</label>
                    <select multiple value={age} onChange={(e) => setAge([...e.target.selectedOptions].map(option => option.value))}>
                        <option value="">전체</option>
                        <option value="1">0∼12세</option>
                        <option value="2">13∼18세</option>
                        <option value="3">19∼24세</option>
                        <option value="4">25∼29세</option>
                        <option value="5">30∼34세</option>
                        <option value="6">35∼39세</option>
                        <option value="7">40∼44세</option>
                        <option value="8">45∼49세</option>
                        <option value="9">50∼54세</option>
                        <option value="10">55∼59세</option>
                        <option value="11">60세 이상</option>
                    </select>
                </div>
                <div>
                    <label>키워드 그룹:</label>
                    {keywordGroups.map((group, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="그룹 이름"
                                value={group.groupName}
                                onChange={(e) => handleKeywordChange(index, e.target.value)}
                            />
                            {group.keywords.map((keyword, keywordIndex) => (
                                <input
                                    key={keywordIndex}
                                    type="text"
                                    placeholder="키워드"
                                    value={keyword}
                                    onChange={(e) => handleKeywordGroupChange(index, keywordIndex, e.target.value)}
                                />
                            ))}
                            <button onClick={() => addKeywordToGroup(index)}>키워드 추가</button>
                        </div>
                    ))}
                    <button onClick={addKeywordGroup}>키워드 그룹 추가</button>
                </div>
                <button onClick={handleSearch}>조회</button>
            </div>
            <h1>검색 결과</h1>
            {results.map((result, index) => (
                <div className={styles.resultItem} key={index}>
                    <h2>{result.title}</h2>
                    <p>키워드: {result.keywords.join(", ")}</p>
                    {result.data.map((dataItem, dataIndex) => (
                        <div key={dataIndex}>
                            <p>{dataItem.period}: {dataItem.ratio}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default NaverSearchTrend;
