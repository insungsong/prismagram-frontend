export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      //window.location.reload(); 컴퓨터의 캐쉬에서 우선 파일을 찾아봅니다. 없으면 서버에서 받아옵니다.
      window.location = "/";
      return null;
    }
  }
};
