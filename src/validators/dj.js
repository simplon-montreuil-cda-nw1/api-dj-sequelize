const { isNil } = require("lodash");

const nameValidation = (name) => {
  if (isNil(name) || name === "") {
    return "Le nom doit être renseigné";
  }
  if (typeof name !== "string") {
    return "Le nom doit être une chaîne de caractères";
  }
  if (name.length < 3 || name.length > 50) {
    return "Le nom doit contenir entre 3 et 50 caractères";
  }
  return null;
};

const biographyValidation = (biography) => {
  if (isNil(biography) || biography === "") {
    return "La biographie doit être renseigné";
  }
  if (typeof biography !== "string") {
    return "La biographie doit être une chaîne de caractères";
  }
  if (biography.length < 500 || biography.length > 2000) {
    return "La biographie doit contenir entre 500 et 2000 caractères";
  }
  return null;
};

const musicalGenresValidation = (musicalGenres) => {
  if (isNil(musicalGenres) || musicalGenres.length === 0) {
    return "Les genres de musique doivent être renseignés";
  }
  for (let index = 0; index < musicalGenres.length; index += 1) {
    const musicalGenre = musicalGenres[index];
    if (typeof musicalGenre !== "string") {
      return "Le genre de musique doit être une chaîne de caractères";
    }
    if (musicalGenre.length < 3 || musicalGenre.length > 50) {
      return `Le genre de musique doit contenir entre 3 et 50 caractères`;
    }
  }
  return null;
};

const socialNetworkValidation = (socialNetworkData, socialNetworkName) => {
  if (isNil(socialNetworkData) || socialNetworkData === "") {
    return `Le nom d'utilisateur du compte ${socialNetworkName} doit être renseignée`;
  }
  if (typeof socialNetworkData !== "string") {
    return `L'url de la photo de profil doit être une chaîne de caractères`;
  }
  if (socialNetworkData.length < 10 || socialNetworkData.length > 2083) {
    return `L'url de la photo de profil doit contenir entre 10 et 255 caractères`;
  }
  return null;
};

module.exports = (data) => {
  /* eslint-disable camelcase */
  const {
    name,
    biography,
    musical_genres,
    soundcloud,
    facebook,
    instagram,
    spotify,
    beatport,
    mixcloud,
    youtube,
  } = data;
  /* eslint-enable camelcase */
  const errors = [];

  const nameError = nameValidation(name);
  if (nameError) errors.push({ field: "name", message: nameError });

  const biographyError = biographyValidation(biography);
  if (biographyError)
    errors.push({ field: "biography", message: biographyError });

  const musicalGenresError = musicalGenresValidation(musical_genres);
  if (musicalGenresError)
    errors.push({ field: "musical_genres", message: musicalGenresError });

  if (soundcloud) {
    const soundcloudError = socialNetworkValidation(soundcloud, "Soundcloud");
    if (soundcloudError)
      errors.push({ field: "soundcloud", message: soundcloudError });
  }

  if (facebook) {
    const facebookError = socialNetworkValidation(facebook, "Facebook");
    if (facebookError)
      errors.push({ field: "facebook", message: facebookError });
  }

  if (instagram) {
    const instagramError = socialNetworkValidation(instagram, "Instagram");
    if (instagramError)
      errors.push({ field: "instagram", message: instagramError });
  }

  if (spotify) {
    const spotifyError = socialNetworkValidation(spotify, "Spotify");
    if (spotifyError) errors.push({ field: "spotify", message: spotifyError });
  }

  if (beatport) {
    const beatportError = socialNetworkValidation(beatport, "Beatport");
    if (beatportError)
      errors.push({ field: "beatport", message: beatportError });
  }

  if (mixcloud) {
    const mixcloudError = socialNetworkValidation(mixcloud, "Mixcloud");
    if (mixcloudError)
      errors.push({ field: "mixcloud", message: mixcloudError });
  }

  if (youtube) {
    const youtubeError = socialNetworkValidation(youtube, "Youtube");
    if (youtubeError) errors.push({ field: "youtube", message: youtubeError });
  }

  return errors.length > 0 ? errors : null;
};
