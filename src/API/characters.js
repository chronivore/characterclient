import APIURL from "../Helpers/environment";

export const fetchCharacters = (sessionToken) =>
  fetch(`${APIURL}/character/`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: sessionToken,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

export const deleteCharacter = (sessionToken, characterId) => 
  fetch(`${APIURL}/character/${characterId}`, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: sessionToken,
    }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

