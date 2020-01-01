load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

# Download the Go rules
http_archive(
    name = "io_bazel_rules_go",
    urls = [
        "https://storage.googleapis.com/bazel-mirror/github.com/bazelbuild/rules_go/releases/download/v0.20.2/rules_go-v0.20.2.tar.gz",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.20.2/rules_go-v0.20.2.tar.gz",
    ],
    sha256 = "b9aa86ec08a292b97ec4591cf578e020b35f98e12173bbd4a921f84f583aebd9",
)

# Load and call the dependencies
load("@io_bazel_rules_go//go:deps.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()

go_register_toolchains()

# Download Gazelle
http_archive(
    name = "bazel_gazelle",
    urls = [
        "https://storage.googleapis.com/bazel-mirror/github.com/bazelbuild/bazel-gazelle/releases/download/v0.19.1/bazel-gazelle-v0.19.1.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.19.1/bazel-gazelle-v0.19.1.tar.gz",
    ],
    sha256 = "86c6d481b3f7aedc1d60c1c211c6f76da282ae197c3b3160f54bd3a8f847896f",
)

# Load and call Gazelle dependencies
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies", "go_repository")

gazelle_dependencies()

# Add a go repository
go_repository(
    name = "com_github_pkg_errors",
    importpath = "github.com/pkg/errors",
    sum = "h1:iURUrRGxPUNPdy5/HRSm+Yj6okJ6UtLINN0Q9M4+h3I=",
    version = "v0.8.1",
)

go_repository(
    name = "org_golang_x_net",
    importpath = "golang.org/x/net",
    urls = [
        "https://codeload.github.com/golang/net/tar.gz/16b79f2e4e95ea23b2bf9903c9809ff7b013ce85", # master, as of 2019-03-3
    ],
    strip_prefix = "net-16b79f2e4e95ea23b2bf9903c9809ff7b013ce85",
    type = "tar.gz",
    # gazelle args: -go_prefix golang.org/x/net -proto disable
)

# # go sys
# go_repository(
#     name = "com_github_sys",
#     importpath = "github.com/golang/sys",
# 		commit = "04cbcbbfeed8aa0b2b010b2ddab558e9f717fd3e",
# )

# # go net
# go_repository(
#     name = "com_github_net",
#     importpath = "github.com/golang/net",
# 		commit = "c0dbc17a35534bf2e581d7a942408dc936316da4",
# 		build_file_name = ":net.BUILD",
#     # sum = "h1:iURUrRGxPUNPdy5/HRSm+Yj6okJ6UtLINN0Q9M4+h3I=",
#     # version = "v0.8.1",
#     # importpath = "golang.org/x/net/websocket",
#     # sum = "h1:iURUrRGxPUNPdy5/HRSm+Yj6okJ6UtLINN0Q9M4+h3I=",
#     # version = "master",
# )

# The Bazel buildtools repo contains tools like the BUILD file formatter, buildifier
# This commit matches the version of buildifier in angular/ngcontainer
# If you change this, also check if it matches the version in the angular/ngcontainer
# version in /.circleci/config.yml
BAZEL_BUILDTOOLS_VERSION = "49a6c199e3fbf5d94534b2771868677d3f9c6de9"
http_archive(
    name = "com_github_bazelbuild_buildtools",
    url = "https://github.com/bazelbuild/buildtools/archive/%s.zip" % BAZEL_BUILDTOOLS_VERSION,
    strip_prefix = "buildtools-%s" % BAZEL_BUILDTOOLS_VERSION,
    sha256 = "edf39af5fc257521e4af4c40829fffe8fba6d0ebff9f4dd69a6f8f1223ae047b",
)
