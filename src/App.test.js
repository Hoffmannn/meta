import api from "./api";

test("API retorna os dados de países", async () => {
  const countries = await api.get("/all").then((res) => res.data);
  expect(countries.length).toBeGreaterThan(0);
});
