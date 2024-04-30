import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getUserCars, searchCars } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import CarCard from "../../components/CarCard";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import UserInfo from "../../components/UserInfo";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: cars } = useAppwrite(() => getUserCars(user.$id));

  const logout = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={cars}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CarCard car={item} />
          // <Text className="text-3xl text-white">{item.make}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6 "
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <UserInfo />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No cars found"
            subtitle="No cars found for the requested search"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
