import React from "react";
import { useParams } from "react-router-dom";

function SongDetails() {
  const { songId } = useParams();

  // Aquí se debe realizar una llamada al backend para obtener los detalles de la canción y su álbum basado en songId.
  // Por ejemplo, puedes usar useEffect y useState para almacenar los datos de la canción y su álbum en el estado local.

  // const [songData, setSongData] = useState(null);
  // const [albumData, setAlbumData] = useState(null);

  // useEffect(() => {
  //   console.log("Obteniendo detalles de la canción desde el backend");
  //   axios
  //     .get(`http://localhost:3000/api/songs/${songId}`)
  //     .then((res) => setSongData(res.data))
  //     .catch((err) => {
  //       console.error("Error al obtener detalles de la canción:", err);
  //     });

  //   console.log("Obteniendo detalles del álbum de la canción desde el backend");
  //   axios
  //     .get(`http://localhost:3000/api/songs/${songId}/album`)
  //     .then((res) => setAlbumData(res.data))
  //     .catch((err) => {
  //       console.error("Error al obtener detalles del álbum de la canción:", err);
  //     });
  // }, [songId]);

  // Luego, puedes mostrar la información en el renderizado de la siguiente manera:

  return (
    <div className="text-white m-5">
      <h2>Song Details</h2>
      <p>Song ID: {songId}</p>
      {/* Mostrar detalles de la canción, por ejemplo: título, duración, etc. */}
      {/* Mostrar detalles del álbum al que pertenece esta canción */}
    </div>
  );
}

export default SongDetails;
