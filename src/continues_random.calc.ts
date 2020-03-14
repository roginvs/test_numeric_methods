export function calculate() {
  let msg = "";
  const addMsg = (s: string) => {
    console.info(s);
    msg += `${s}\n`;
  };

  addMsg("lol kke");

  return msg;
}
