import React, { useEffect, useState } from 'react'
// import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Col, Card, Row, Button } from 'antd';
import { ShoppingFilled } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, price } from './Sections/Datas'; // 체크박스, 라디오박스 데이터
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) /** 더보기 기능, 시작 인덱스 */
    const [Limit, setLimit] = useState(8) /** 더보기 기능, 한 번 select 하는 count */
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    // mount(init)
    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit, // 8개만 가져오기 위해 설정
        }

        getProducts(body)

    }, [])

    // 화면에 출력할 상품정보 SELECT
    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) { // append
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize) /**더보기 버튼 출력 여부 */
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }


    // 더보기 버튼 클릭 이벤트
    const loadMoreHanlder = () => {

        // Limit : 한 번에 또는 더보기 눌렀을 때 가져오는 수
        // Skip : 데이터를 가져오기 시작하는 인덱스

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getProducts(body)
        setSkip(skip)
    }


    // (본문) 상품들을 카드형식으로 출력
    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            {/* 전체화면에서 6*4(4개), 중간화면에서 8*3(3개), 좁은화면에서 24*1(1개) 출력 */}

            {/* 사진 */}
            <Card
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}
            >

                {/* 상품 설명(이름,가격) */}
                <Meta
                    title={product.title}
                    description={`${product.price}만원`}
                />

            </Card>
        </Col>
    })


    // 체크박스(다건), 라디오박스(1건)로 SELECT
    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)

    }


    // 라디오박스 가격대 가져오기
    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) { // Datas.js
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array; // 가격대
            }
        }
        return array;
    }


    // 자식 컴포넌트로부터 state 받기
    const handleFilters = (filters, category) => { // filters 체크된 것들

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log('filters', filters)

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters) // 체크박스(다건), 라디오박스(1건)로 SELECT
        setFilters(newFilters) // 체크박스, 라디오박스 함께 조건으로 들어가 SELECT
    }


    // 문자열 검색
    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters, // 체크,라디오박스 선택값에 더해서 SELECT
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)

        getProducts(body)
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2>Shop <ShoppingFilled /> </h2>
            </div>

            {/* Filter : 체크,라디오박스 검색 */}
            <Row gutter={[16, 16]}>

                {/* 검색조건 데이터 : LandingPage/Sections/Datas.js */}

                {/* CheckBox(국가) -> LandingPage/Sections/CheckBox.js */}
                <Col lg={12} xs={24}>
                    {/* large 일때 12 */}
                    <Checkbox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                    {/* list={continents} : data,  handleFilters : 자식 컴포넌트 state 받기 */}
                </Col>

                {/* RadioBox(가격) */}
                <Col lg={12} xs={24}>
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>

            </Row>


            {/* Search : 문자열 검색 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                {/* justifyContent: 'flex-end' :우측 정렬 */}
                <SearchFeature
                    refreshFunction={updateSearchTerm} // 자식 컴포넌트 state 받기
                />
            </div>


            {/* Cards : 본문 */}
            <Row gutter={[16, 16]} >
                {/* 여백 16 */}
                {renderCards}
            </Row>

            <br />


            {/* 더보기 기능
                MongoDB 기능 
                Limit : 한 번에 또는 더보기 눌렀을 때 가져오는 수
                Skip : 데이터를 가져오기 시작하는 인덱스
            */}
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" onClick={loadMoreHanlder}>더보기</Button>
                </div>
            }

        </div>
    )
}

export default withRouter(LandingPage)


