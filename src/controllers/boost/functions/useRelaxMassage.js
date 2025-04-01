const useRelaxMassage = async (user, session) => {
  try {
    user.mood = 100;
    await user.save({ session });
    return true;
  } catch (e) {
    console.log("Error in useRelaxMassage", e);
    return false;
  }
};

export default useRelaxMassage;