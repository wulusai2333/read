环境准备
---

> C++开发环境
>
> IDE,如VSCODE,CLion
>
> MinGW

我觉得[菜鸟教程环境搭建](https://www.runoob.com/rust/rust-setup.html) 是更详细的搭建过程...

安装rust参考官方文档 [rust](https://www.rust-lang.org/zh-CN/tools/install) 其中[微软C++生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/) 咱直接安装了下面介绍的完整环境

[MinGW](https://jaist.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/sjlj/x86_64-8.1.0-release-posix-sjlj-rt_v6-rev0.7z) 它实际上是将经典的开源 C语言 编译器 GCC 移植到了 Windows 平台下，并且包含了 Win32API ，因此可以将源代码编译为可在 Windows 中运行的可执行程序。

[Cargo](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) [rustup-init.exe](https://win.rustup.rs/) Rust工程必备工具

如果最后无法正确编译运行rust项目,你可能需要 [visualcppbuildtools_full.exe](https://download.microsoft.com/download/5/f/7/5f7acaeb-8363-451f-9425-68a90f98b238/visualcppbuildtools_full.exe) 来保证完整的安装了C++开发环境

试着打开命令行窗口,正常输出版本号说明rust和cargo安装正确

```bash
rustc --version
cargo -V
```

可以在命令行抽卡使用 `cargo new hello_world --bin`新建一个rust项目或者使用IDE来创建 参考[第一步](https://cargo.budshome.com/getting-started/first-steps.html)

```bash
cargo new hello_world --bin
cd hello_world
cargo build
./target/debug/hello_world
```

正常输出 `Hello, world!`证明我们的环境可以正常编译运行rust程序,现在就可以开始愉快的学习rust语言了!

当然我们也可以直接使用命令`cargo run`会自行编译运行上面命令创建的`hello_world`项目

## IDE

### CLion

需要在应用市场`File>setting>Plugins`搜索安装 Rust插件 

在设置里搜索`Toolchains`添加MinGW

不知道是不是我个人配置的问题,clion的rust插件对rust的代码提示十分薄弱,运行时异常都没检查出来

### VScode

在拓展`ctrl+shift+x`搜索rls安装rust插件 

### 再补充几个 cargo 的重要子命令(菜鸟教程评论区cv的)

cargo clippy: 类似eslint，lint工具检查代码可以优化的地方

cargo fmt: 类似go fmt，代码格式化

cargo tree: 查看第三方库的版本和依赖关系

cargo bench: 运行benchmark(基准测试,性能测试)

cargo udeps(第三方): 检查项目中未使用的依赖

另外 cargo build/run --release 使用 release 编译会比默认的 

debug 编译性能提升 10 倍以上，但是 release 缺点是编译速度较慢，而且不会显示 panic backtrace 的具体行号

