import { View, Text, Dimensions, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CarouselSlider, { Pagination } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { getCategory } from '../../features/categoryListing/CategoryListingSlice';
const sliderWidth = Dimensions.get('screen').width;

const Carousel = () => {
  const { category, isLoader } = useSelector((state: RootState) => state.userCategory);
  const carouselRef = useRef<any>();
  const [activeSlide, setActiveSlide] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  dispatch(getCategory());
}, []);
  const renderItem = ({ item, index }: any) => {
    return (
      <View key={index}>
        <Image
          source={{
            uri: `https://source.unsplash.com/450x300/?${item.name}`,
          }}
          style={styles.categoryImage}
        />
      </View>
    );
  };

  return (
    <>
    {isLoader ? <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View> : (  <View style={styles.carouselContainer}>
      <CarouselSlider
        ref={carouselRef}
        data={category}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={420}
        autoplay={true}
        autoplayInterval={5000}
        onSnapToItem={index => setActiveSlide(index)}
        loop={true}
      />
      <Pagination
        dotsLength={category.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: 'absolute',
          bottom: -20,
          left: '25%',
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
        }}
        inactiveDotStyle={{ width: 15, height: 15, borderRadius: 10 }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotColor="green"
        inactiveDotColor="#FFFFFF"
      />
    </View> )}
    </>
  
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
  },
  imgStyle: {
    height: 250,
    width: '100%',
  },
  categoryImage: {
    height: 210,
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dfe4ea',
  },
});

export default Carousel;
