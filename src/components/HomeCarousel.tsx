import React, { useState, useEffect } from 'react';
import { Carousel, Container, Image } from 'react-bootstrap';
//import ReactHtmlParser from 'react-html-parser';

const HomeCarousel: React.FC = () => {

    type CarouselType = {
        id?: number | string,
        name?: string,
        activeIndex?: number,
        controls?: boolean,
        fade?: boolean,
        indicators?: boolean,
        interval?: number,
        keyboard?:boolean,
        nextIcon?: string,
        nextLabel?: string,
        pauseOnHover?: boolean,
        prevIcon?: string,
        prevLabel?: string,
        slide?: boolean,
        touch?: boolean,
        wrap?: boolean,
        use?: string,
        home_carousel_items?: [
            {
                id?: number | string,
                name?: string,
                captionHeader?: string,
                captionBody?: string,
                imgClassName?: string,
                imgSrc?: string,
                imgAlt?: string,
                show?: boolean
            }
        ]
    }  

    type StateType = {
        index?: number,
        carousel: CarouselType[] | null
    }

    const [state, setState] = useState<StateType>({index: 0, carousel: null});
  
    const handleSelect = (selectedIndex: any) => {
      setState({...state, index: selectedIndex});
    };

    //function to fetch data
    const fetchData = async () => {
        try {
        const response = await fetch("/home-carousels?name=Main Home Carousel&home_carousel_items.show=true");
        const data: CarouselType[] = await response.json();
        //set in state  
        setState({...state, index: data[0].activeIndex, carousel: data})
        //alert(data);
        } catch (error) {
        //set state
        //console.log(error);
        setState({...state, carousel: null})
        }
    };

    //useEffect to be run once, hence the second parameter []. Loads data at componentDidMount life cycle stage
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);
    
    //prepare carousel for return
    let carousel = null;

    if (state.carousel !== null){
        //get carousel props from database
        const carouselProps = {
            activeIndex: state.carousel[0].activeIndex,
            controls: state.carousel[0].controls,
            fade: state.carousel[0].fade,
            indicators: state.carousel[0].indicators,
            interval: state.carousel[0].interval,
            keyboard: state.carousel[0].keyboard,
            //nextIcon: ReactHtmlParser(state.carousel[0].nextIcon!),
            nextLabel: state.carousel[0].nextLabel!,
            pauseOnHover: state.carousel[0].pauseOnHover,
            //prevIcon: ReactHtmlParser(state.carousel[0].prevIcon!),
            prevLabel: state.carousel[0].prevLabel,
            slide: state.carousel[0].slide,
            touch: state.carousel[0].touch,
            wrap: state.carousel[0].wrap,
        }
        carousel = (
            //embed Carousel component
            <Carousel {...carouselProps} activeIndex={state.index} onSelect={handleSelect}>
                {
                    //iterate through items and embed items
                    state.carousel[0]!.home_carousel_items!.map((carouselItem) => {
                        return(
                            <Carousel.Item>
                                <Image
                                    className={carouselItem.imgClassName}
                                    src={carouselItem.imgSrc}
                                    alt={carouselItem.imgAlt}
                                />
                                <Carousel.Caption>
                                    <h3>{carouselItem.captionHeader}</h3>
                                    <p>{carouselItem.captionBody}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )

                    })
                }
            </Carousel>
        )// end if state.carousel !== undefined
    }else{//carousel is undefined
        carousel = (
            <Container>
                Loading available slides ...
            </Container>
        )
    }

    //finally, display whatever is the composed carousel
    return (
        <Container fluid className='w-100 p-0'>
            {/** Here, I could add carousel-at-top-position to className which I added to App.css to push carousel to top */}
            {carousel}
        </Container>
    );
}
export default HomeCarousel;