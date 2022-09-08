import {StyleSheet} from 'react-native';

export const MovieCardStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  imageContainer: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 10,
    marginHorizontal: 12,
  },
  image: {
    width: 85,
    height: 120,
    borderRadius: 10,
  },
  rightContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: 10,
  },
  voteContainer: {
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteText: {
    marginLeft: 5,
  },
  genreScrollStyle: {
    maxHeight: 40,
    zIndex: 5,
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  genreStyle: {
    borderRadius: 15,
    padding: 5,
    marginRight: 5,
    paddingHorizontal: 15,
  },
  genreText: {
    fontSize: 12,
  },
});
