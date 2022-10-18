import React, { useState, useEffect } from "react";
import OuraSleep from "../src/OuraSleep";

export default { title: "OuraSleep" };

export const app = () => {
  return <OuraSleep stage="dev" />;
};
app.story = {
  name: "OuraSleep",
};
