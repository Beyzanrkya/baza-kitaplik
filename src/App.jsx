import React, { useState, useEffect } from "react";

function App() {
  // 📚 Başlangıç kitap listesi
  const baslangicKitaplar = [
    { id: 1, baslik: "React Öğreniyorum", yazar: "Asım Sinan Yüksel", kategori: "Web" },
    { id: 2, baslik: "Python ile Programlama", yazar: "Guido Rossum", kategori: "Programlama" },
    { id: 3, baslik: "Veri Yapıları", yazar: "Donald Knuth", kategori: "Algoritma" },
    { id: 4, baslik: "HTML ve CSS", yazar: "Jon Duckett", kategori: "Web" },
    { id: 5, baslik: "JavaScript Derinlemesine", yazar: "Kyle Simpson", kategori: "Web" },
    { id: 6, baslik: "Modern Java", yazar: "Joshua Bloch", kategori: "Programlama" },
    { id: 7, baslik: "C# ile Nesne Yönelimli Programlama", yazar: "Ahmet Yılmaz", kategori: "Programlama" },
    { id: 8, baslik: "Node.js Uygulama Geliştirme", yazar: "Ryan Dahl", kategori: "Web" },
    { id: 9, baslik: "Veri Bilimi 101", yazar: "Hilary Mason", kategori: "Veri Bilimi" },
    { id: 10, baslik: "Yapay Zekâya Giriş", yazar: "Stuart Russell", kategori: "Yapay Zekâ" },
  ];

  // 🧠 State’ler
  const [kitaplar] = useState(baslangicKitaplar);
  const [aramaMetni, setAramaMetni] = useState(localStorage.getItem("arama") || "");
  const [kategori, setKategori] = useState("Tümü");
  const [favoriler, setFavoriler] = useState(JSON.parse(localStorage.getItem("favoriler")) || []);

  // 💾 localStorage senkronizasyonu
  useEffect(() => {
    localStorage.setItem("arama", aramaMetni);
  }, [aramaMetni]);

  useEffect(() => {
    localStorage.setItem("favoriler", JSON.stringify(favoriler));
  }, [favoriler]);

  // 🔍 Filtreleme işlemi
  const filtreliKitaplar = kitaplar.filter((k) => {
    const eslesmeBaslik = k.baslik.toLowerCase().includes(aramaMetni.toLowerCase());
    const eslesmeKategori = kategori === "Tümü" || k.kategori === kategori;
    return eslesmeBaslik && eslesmeKategori;
  });

  // ❤ Favori ekleme / çıkarma
  const favoriDegistir = (kitap) => {
    if (favoriler.find((f) => f.id === kitap.id)) {
      setFavoriler(favoriler.filter((f) => f.id !== kitap.id));
    } else {
      setFavoriler([...favoriler, kitap]);
    }
  };

  // 🔍 Arama Çubuğu
  const AramaCubugu = () => (
    <div className="mb-4">
      <input
        type="text"
        value={aramaMetni}
        onChange={(e) => setAramaMetni(e.target.value)}
        placeholder="Kitap ara..."
        className="border p-2 rounded w-full"
      />
    </div>
  );

  // 🏷 Kategori Filtre
  const KategoriFiltre = () => {
    const kategoriler = ["Tümü", "Web", "Programlama", "Algoritma", "Veri Bilimi", "Yapay Zekâ"];
    return (
      <div className="mb-4">
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="border p-2 rounded"
        >
          {kategoriler.map((kat) => (
            <option key={kat} value={kat}>
              {kat}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // 📘 Kitap Kartı
  const KitapKarti = ({ kitap }) => {
    const favorideMi = favoriler.some((f) => f.id === kitap.id);
    return (
      <div className="border rounded p-4 shadow-sm flex flex-col justify-between bg-white">
        <div>
          <h2 className="text-lg font-semibold">{kitap.baslik}</h2>
          <p className="text-sm text-gray-600">Yazar: {kitap.yazar}</p>
          <p className="text-sm text-gray-500">Kategori: {kitap.kategori}</p>
        </div>

        <button
          onClick={() => favoriDegistir(kitap)}
          className={`mt-3 px-3 py-1 rounded ${
            favorideMi ? "bg-red-400 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {favorideMi ? "Favoriden Çıkar" : "Favoriye Ekle"}
        </button>
      </div>
    );
  };

  // 📚 Kitap Listesi
  const KitapListesi = () => {
    if (filtreliKitaplar.length === 0) {
      return <p>Hiç kitap bulunamadı.</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {filtreliKitaplar.map((kitap) => (
          <KitapKarti key={kitap.id} kitap={kitap} />
        ))}
      </div>
    );
  };

  // ❤ Favori Paneli
  const FavoriPaneli = () => (
    <div className="border-t pt-4 mt-6">
      <h2 className="text-xl font-semibold mb-2">
        ❤ Favoriler ({favoriler.length})
      </h2>
      {favoriler.length === 0 ? (
        <p>Henüz favori kitap yok.</p>
      ) : (
        <ul className="list-disc pl-5">
          {favoriler.map((f) => (
            <li key={f.id}>{f.baslik}</li>
          ))}
        </ul>
      )}
    </div>
  );

  // 🧠 Render
  return (
    <div className="p-5 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-3">📚 Okul Web Kitaplığı</h1>

      <AramaCubugu />
      <KategoriFiltre />
      <KitapListesi />
      <FavoriPaneli />
    </div>
  );
}

export default App;