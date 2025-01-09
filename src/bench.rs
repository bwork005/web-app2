#[cfg(test)]
mod tests {
    use crate::static_files;
    use bencher::{benchmark_group, benchmark_main, Bencher};
    use std::path::Path;

    fn bench_static_files(b: &mut Bencher) {
        let static_dir = Path::new("static");
        b.iter(|| static_files::serve_static(static_dir, "/index.html").unwrap());
    }

    benchmark_group!(benches, bench_static_files);
    benchmark_main!(benches);
}
