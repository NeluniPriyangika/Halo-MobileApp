import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants';
import FormField from '../../components/FormField';
import CoustomButton from "../../components/CustomButton";
import { Link } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [from,setForm] = useState ({
    username : '',
    email : '',
    password : ''
  })

  const [isSubmitting , setIsSubmitting] = useState(false)

  const submit = () => {
    createUser ();
  }

  return (
    <SafeAreaView className="bg-primary h-full" >
      <ScrollView>
        <View className="w-full justify-center min-h-[93vh] px-4 my-6">

          <Image 
            source={images.logo} 
            resizeMode='contain' 
            className="w-[115px] h-[35px]"/>

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up to Halo</Text>

          <FormField 
            title = "Username"
            value = {from.username}
            handleChangeText={(e) => setForm({...from, username: e})}
            otherStyles= "mt-7"
          />

          <FormField 
            title = "Email"
            value = {from.email}
            handleChangeText={(e) => setForm({...from, email: e})}
            otherStyles= "mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title = "Password"
            value = {from.password}
            handleChangeText={(e) => setForm({...from, password: e})}
            otherStyles= "mt-7"
          />

          <CoustomButton 
            title="Sign-In"
            handlePress={submit}
            containerStyles = "mt-7"
            isLoading = {isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have account already
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign in</Link>

          </View>

        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp