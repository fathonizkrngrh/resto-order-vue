module.exports.formatRupiah = (angka) => {
    let reverse = angka.toString().split('').reverse().join(''); // Ubah angka menjadi string, balik urutannya
    let ribuan = reverse.match(/\d{1,3}/g); // Pisahkan menjadi grup-grup tiga angka
  
    let formatted = ribuan.join('.').split('').reverse().join(''); // Gabungkan dengan titik dan balik urutan lagi
    return formatted;
}

