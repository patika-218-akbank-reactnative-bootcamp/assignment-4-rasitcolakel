import {FlatList, View} from 'react-native';
import React, {useRef} from 'react';
import CustomInput from '@src/components/CustomInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SearchScreenStyle as styles} from '@src/styles/Search.style';
import CustomText from '@src/components/CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector} from '@src/store';
import CustomKeyboardAvoidingView from '@src/components/CustomKeyboardAvoidingView';
import {useDispatch} from 'react-redux';
import {searchMovieRequest} from '@src/assets/api';
import {setMovies} from '@src/store/slices/movies';
import {BaseParams} from '@src/types/APITypes';
import {setLoading} from '@src/store/slices/theme';
import MovieCard from '@src/components/MovieCard';
import {AppStackParamsList} from '.';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppStackParamsList, 'BottomTabs'>;

const SearchScreen = ({navigation}: Props) => {
  const flatListRef = useRef<FlatList>(null);
  const {searchedMovies} = useAppSelector(state => state.movies);
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');
  const [blured, setBlured] = React.useState(false);
  const searchMovies = async (isClear: boolean, params?: BaseParams) => {
    try {
      if (!search) {
        setBlured(false);
        return;
      }
      dispatch(setLoading(true));
      const data = await searchMovieRequest({
        query: search,
        ...params,
      });
      dispatch(setMovies({type: 'searchedMovies', data, isClear}));
      setBlured(true);
      isClear && flatListRef.current?.scrollToIndex({index: 0});
    } catch (error: any) {
      console.log(error.response);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <CustomKeyboardAvoidingView isFlatList>
      <View style={styles.container}>
        <View style={[styles.inputContainer]}>
          <CustomInput
            placeholder="Search"
            onEndEditing={() => searchMovies(true)}
            value={search}
            onChangeText={(text: string) => {
              setSearch(text);
              setBlured(false);
            }}
            iconComponent={AntDesign}
            returnKeyType="search"
            iconComponentProps={{
              name: 'search1',
              size: 25,
              style: styles.icon,
              onPress: () => searchMovies(true),
            }}
          />
        </View>
        {searchedMovies.results.length === 0 ? (
          <InformationArea isNotFound={!!search && blured} />
        ) : (
          <View style={styles.container}>
            <FlatList
              ref={flatListRef}
              style={styles.listContainer}
              data={searchedMovies.results}
              renderItem={({item}) => (
                <MovieCard
                  movie={item}
                  onPress={() =>
                    navigation.navigate('MovieDetail', {movie: item})
                  }
                />
              )}
              keyExtractor={item => 'test' + '-' + item.id.toString()}
              maxToRenderPerBatch={10}
              // performance improvement
              initialNumToRender={5}
              onEndReached={() => {
                if (searchedMovies.page < searchedMovies.total_pages) {
                  searchMovies(false, {
                    page: searchedMovies.page + 1,
                  });
                }
              }}
            />
          </View>
        )}
      </View>
    </CustomKeyboardAvoidingView>
  );
};

type InformationAreaProps = {
  isNotFound?: boolean;
};
const InformationArea = ({isNotFound}: InformationAreaProps) => {
  const {colors} = useAppSelector(state => state.theme);
  const text = !isNotFound ? 'Search Movies' : 'Try Again';
  const subText = !isNotFound
    ? 'Which movies are you looking for?'
    : 'Unfortunately, we could not find any results for your search';
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={isNotFound ? 'search-off' : 'movie-filter'}
        size={150}
        color={colors.primary}
      />
      <CustomText title={text} size="xlarge" style={styles.text} />
      <CustomText
        title={subText}
        size="large"
        variant="secondary"
        style={styles.text}
      />
    </View>
  );
};

export default SearchScreen;
