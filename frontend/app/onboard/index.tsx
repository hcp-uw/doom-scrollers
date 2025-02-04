import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';
import { useRouter } from 'expo-router';
import { getAllGenres, selectGenre } from '@/services/genre';
import { Genre } from '@/types';
import GenreCard from '@/components/GenreCard';
import { ScrollView } from 'react-native';
import { Button } from '@/components/Button';

const Index = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const router = useRouter();

  const updateSelectedGenres = async () => {
    for (const genre of selectedGenres) {
      await selectGenre(genre.value);
    }
  };

  const handleContinue = async () => {
    await updateSelectedGenres();
    router.navigate('/main');
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const allGenres = await getAllGenres();
      setGenres(allGenres);
    };
    fetchGenres();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerContainer}>
        <Header text="choose your favorite genres" style={{ fontSize: 22 }} />
      </View>
      <ScrollView>
        <View style={styles.container}>
          {genres.map((genre) => (
            <GenreCard
              key={genre.id}
              genre={genre.value}
              selected={selectedGenres.includes(genre)}
              onPress={() => {
                if (selectedGenres.includes(genre)) {
                  setSelectedGenres(selectedGenres.filter((g) => g !== genre));
                } else {
                  setSelectedGenres([...selectedGenres, genre]);
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
      {selectedGenres.length > 0 && (
        <Button
          title="Continue"
          style={{
            width: '80%',
            alignSelf: 'center',
            marginBottom: 40,
          }}
          onPress={handleContinue}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    rowGap: 20,
    columnGap: 5,
  },
  headerContainer: {
    marginBottom: 30,
    marginTop: 40,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;
