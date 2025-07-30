
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
     
      session.user.role = token.role ?? "user";
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        token.role = "user"; 
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
