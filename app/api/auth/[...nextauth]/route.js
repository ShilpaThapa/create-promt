import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({session}){
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            console.log(sessionUser);
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
            try {
                await connectToDB();
                // check if the user already exists
                const userExists = await User.findOne({email: profile.email});
                console.log(profile.name.replace(/ /g,"").toLowerCase())
                // if not create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/ /g,"").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
    // async session({session}){
    //     const sessionUser = await User.findOne({
    //         email: session.user.email
    //     })
    //     session.user.id = sessionUser._id.toString();
    //     return session;
    // },
    // async signIn({profile}){
    //     try {
    //         await connectToDB();
    //         //check if the user already exists
    //         const userExists = await User.findOne({email: profile.email});

    //         //if not create a new user
    //         if (!userExists) {
    //             await User.create({
    //                 email: profile.email,
    //                 username: profile.name.replace(" ","").toLowerCase(),
    //                 image: profile.picture
    //             })
    //         }
    //         return true;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }

    // }
})

export {handler as GET, handler as POST}