const useEnergyCup = async (user, session) => {
  try {
    user.energy = user?.energy_capacity;
    await user.save({ session });
    return true;
  } catch (e) {
    console.log("Error in useEnergyCup ", e);
    return false;
  }
};

export default useEnergyCup;