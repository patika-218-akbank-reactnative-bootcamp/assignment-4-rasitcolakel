import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -30,
    padding: 30,
  },
  bottomStyle: {
    paddingBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  titleSecond: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  voteText: {
    marginLeft: 15,
    bottom: -1,
  },
  header: {
    left: 0,
    right: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  castContainer: {
    flex: 1 / 4,
    margin: 5,
    paddingBottom: 20,
  },
  castImage: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  castText: {
    textAlign: 'center',
    paddingTop: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreScrollStyle: {
    marginVertical: 15,
    maxHeight: 40,
    zIndex: 5,
  },
  goBackContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 5,
    top: 40,
    left: 0,
    width: '100%',
    padding: 10,
  },
  headerTitle: {
    fontSize: 19,
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});
