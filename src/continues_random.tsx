import React, { useState, useEffect } from "react";

import { calculate } from "./continues_random.calc";
import { BaseUi } from "./03-base-ui";

export const ContinuesRandom = () => {
  return <BaseUi calculate={calculate} name="Непрерывная случайная величина" />;
};
