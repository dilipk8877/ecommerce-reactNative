import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, Text } from 'react-native';
import { StyleSheet, View } from 'react-native'
import Carousel, { Pagination }  from 'react-native-snap-carousel';

interface Item {
  title: string;
}

const HomeScreen = () => {
  const data = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' },
    { title: 'Item 4' },
    { title: 'Item 5' },
  ];

  // const renderItem = ({ item }: { item: Item }) => (
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Image source={require("../../assets/image/samantha-borges-gXsJ9Ywb5as-unsplash.jpg")} style={{ width: "100%", height: "100%" }} />
  //     <Text>{item.title}</Text>
  //   </View>
  // );

  const renderItem = ({ item }:any) => {
    return (
      <View style={styles.slide}>
        {/* Your slide content */}
      </View>
    );
  };
  const carouselRef = useRef<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplayDelay = 2000; // Delay between slides (in milliseconds)

  // Automatically advance to the next slide
  const autoplay = () => {
    if (carouselRef.current) {
      const nextSlide = (activeSlide + 1) % data.length;
      carouselRef.current.snapToNext();
      setActiveSlide(nextSlide);
    }
  };

  useEffect(() => {
    const timer = setInterval(autoplay, autoplayDelay);
    return () => clearInterval(timer);
  }, [activeSlide]);



  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={300} // Adjust to your desired width
        itemWidth={300} // Adjust to your desired width
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};
export default HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: 300,
    height: 200, // Adjust to your desired height
    backgroundColor: 'gray',
    borderRadius: 8,
  },
  paginationContainer: {
    marginTop: 20,
    paddingVertical: 8,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  inactiveDotStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});